import React, { useEffect, useState } from 'react';
import { NFTData, NFTDisplay } from 'react-ethereum-nft';

function NFTViewer({ contractAddress, tokenId }) {
    const [nftData, setNFTData] = useState(null);

    useEffect(() => {
        async function fetchNFTData() {
            try {
                const nftData = await NFTData.fetch(contractAddress, tokenId);
                setNFTData(nftData);
            } catch (error) {
                console.error('Error fetching NFT data:', error);
            }
        }

        fetchNFTData();
    }, [contractAddress, tokenId]);

    return (
        <div>
            {nftData ? (
                <NFTDisplay nftData={nftData} />
            ) : (
                <p>Loading NFT data...</p>
            )}
        </div>
    );
}

export default NFTViewer;