import { useEffect, useState } from "react"
import { trpc } from "./global/utils/trpc";

const App = () => {
  const useQuery = trpc.api.helloWorld.useQuery({ msg: "It works!" });
  const [data, setData] = useState<string>("Loading...")

  useEffect(() => {
    if (useQuery.data)
      setData(useQuery.data.msg);
  }, [useQuery.data])

  return (
    <>
      <h1 className="text-skin-base text-opacity-30">{data}</h1>
    </>
  )
}

export default App
