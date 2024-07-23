
import { useState } from "react";
import { useTheme } from "../components/theme_context";
import Link from "next/link";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "@/app/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const Profile = () => {

  const { theme } = useTheme();
  const [ user ] = useAuthState(auth);
  const [ normalState, setNormalState ] = useState(true);

  const [ fileUpload, setFileUpload ] = useState<File | null>(null);
  const [ fileName, setFileName ] = useState<string>("");
  const [ uploading, setUploading ] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUpload(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } else {
      setFileUpload(null);
      setFileName("");
    }
  };

  const uploadFile = async () => {
    if (!fileUpload || !user) return;
    setUploading(true);
    const filesFolderRef = ref(storage, `profilePhotos/${user?.uid}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      const url = await getDownloadURL(filesFolderRef);
      await updateProfile(user, { photoURL: url });
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`p-4 rounded shadow-md w-full max-w-[30rem] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex items-center space-x-5">

        <button onClick={() => { if(user) setNormalState(!normalState); }}>
          <div className="relative w-24 h-24 overflow-hidden rounded-xl">
            <Image src={user?.photoURL || "/images/defaultProfilePhoto.png"} alt="Profile Photo" fill style={{ objectFit: 'cover' }} className="rounded-xl"/>
          </div>
        </button>
        
        <div className="flex flex-col items-left">
          {normalState ? (
            <>
              <h1 className="text-3xl font-bold">
                {user ? "Hello " + user.displayName + "." : "NOT LOGGED IN!"}
              </h1>
              <div className="flex flex-row items-center space-x-2">
                <h2 className="text-xl font-bold">
                  Welcome to
                </h2>
                <Link href="/" className="flex items-center gap-2">
                  <Image src="/images/PaperHans.png" alt="PaperHans Logo" width={32} height={32} />
                  <span className="text-xl font-bold">PaperHans!</span>
                </Link>
              </div>
              <h3 className="text-lg font-md">
              Your new one stop crypto webapp.
              </h3>
            </>
          ):(
            <>
              <h1 className="text-3xl font-bold">
                Change Profile Photo
              </h1>
              <div>
                <div className="flex flex-row">
                  <input
                    type="file"
                    accept="image/*"
                    id="file-input"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-input" className={`text-white text-base md:text-md font-medium py-1 px-4 p-3 rounded bg-indigo-600 text-white hover:bg-indigo-500 w-full text-center`}>
                    Choose File
                  </label>
                  <h1 className="text-lg font-bold">
                    {fileName ? fileName : <></>}
                  </h1>
                </div>
                <div className="h-1"></div>
                <button onClick={uploadFile} disabled={uploading} className={`text-white text-base md:text-md font-medium py-1 px-4 p-3 rounded bg-indigo-600 text-white hover:bg-indigo-500 w-1/2`}>
                  { uploading ? "Uploading..." : "Upload File" }
                </button>
                <button onClick={() => setNormalState(true)} className={`text-white text-base md:text-md font-medium py-1 px-4 p-3 rounded bg-red-600 text-white hover:bg-red-500 w-1/2`}>
                  Return
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;