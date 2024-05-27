import asyncio

async def test(a, b):
  await asyncio.sleep(10) # Simulate a 10s computation
  return a + b