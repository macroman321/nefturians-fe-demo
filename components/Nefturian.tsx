import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { addressToID } from "../util";
import useSWR from "swr";


const Nefturian = () => {
  const { account } = useWeb3React<Web3Provider>();

  const { data, isLoading } = useSWR(`https://api.nefturians.io/metadata/${addressToID(account)}`,(url) => fetch(url).then((res) => res.json()));

  // nft.loading is true during load.
  if (isLoading) return <>Loading…</>

  // You can now display the NFT metadata.
  return (
      <section >
        <h1>{data.name}</h1>
        <img src={data.image} alt="" />
        <p>{data.description}</p>
      </section>
  )
};

export default Nefturian;
