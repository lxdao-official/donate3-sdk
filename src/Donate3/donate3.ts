export type Donate3 = {
    "version": "0.1.0",
    "name": "donate3",
    "instructions": [
        {
            "name": "initialize",
            "accounts": [
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "collectionMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "masterEdition",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "metadataAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenMetadataProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "transferLamports",
            "accounts": [
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "to",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenMint",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "tokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "masterEdition",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "metadataAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenMetadataProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                },
                {
                    "name": "message",
                    "type": "string"
                }
            ]
        },
        {
            "name": "transferSplTokens",
            "accounts": [
                {
                    "name": "from",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "fromAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "toAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                },
                {
                    "name": "message",
                    "type": "string"
                }
            ]
        }
    ]
};

export const IDL: Donate3 = {
    "version": "0.1.0",
    "name": "donate3",
    "instructions": [
        {
            "name": "initialize",
            "accounts": [
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "collectionMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "masterEdition",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "metadataAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenMetadataProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "transferLamports",
            "accounts": [
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "to",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenMint",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "tokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "masterEdition",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "metadataAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenMetadataProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                },
                {
                    "name": "message",
                    "type": "string"
                }
            ]
        },
        {
            "name": "transferSplTokens",
            "accounts": [
                {
                    "name": "from",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "fromAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "toAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                },
                {
                    "name": "message",
                    "type": "string"
                }
            ]
        }
    ]
};