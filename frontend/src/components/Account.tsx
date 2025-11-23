import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import "../styles/Account.css"

interface AccountProps {
    setJwt: React.Dispatch<React.SetStateAction<string>>;
}

function Account({ setJwt }: AccountProps) {
    const [userAddress, setUserAddress] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    const checkSavedConnection = async () => {
        try {
            const savedAddress = localStorage.getItem('web3_address');
            
            if (savedAddress) {
                if (window.ethereum) {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const accounts = await provider.send('eth_accounts', []);
                    
                    if (accounts.length > 0 && accounts[0].toLowerCase() === savedAddress.toLowerCase()) {
                        setUserAddress(savedAddress);
                        console.log('Автоматически восстановлено подключение');
                } else {
                    clearSavedData();
                }
                }
            }
        } catch (error) {
            console.error('Ошибка при восстановлении:', error);
            clearSavedData();
        }
    };

    const clearSavedData = () => {
        localStorage.removeItem('web3_address');
    };

    const saveConnectionData = (address: string) => {
        localStorage.setItem('web3_address', address);
    };

    useEffect(() => {
        checkSavedConnection();
    }, []);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert("Установите MetaMask!");
                return;
            }

            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            const address = accounts[0];
            setUserAddress(address);
            saveConnectionData(address)
            console.log("Кошелек подключен:", address);
            
        } catch (error) {
            console.error("Ошибка подключения:", error);
        }
    };

    const signMessage = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            
            const message = await (await fetch('http://localhost:8080/api/v1/auth/nonce', {
                method: 'GET',
                headers: {
                    'Address': userAddress,
                    'Content-Type': 'application/json'
                }
            })).text();
            
            const signature = await signer.signMessage(message);
            
            const authResponse = await fetch('http://localhost:8080/api/v1/auth', {
                method: 'POST',
                headers: {
                    'Address': userAddress,
                    'Content-Type': 'application/json'
                },
                body: signature
            })
            
            if (authResponse.ok) {
                const jwt = await authResponse.text()
                setJwt(jwt);
                setIsLoggedIn(true);
                alert("Успешный вход!");
            } else {
                alert("Ошибка авторизации! " + (await authResponse.text()));
            }
            
        } catch (error) {
            console.error("Ошибка подписи:", error);
        }
    };
    return <div>
        {userAddress == '' ? <button onClick={connectWallet}>Подключить MetaMask</button> : <div>Кошелёк подключен</div>}
        {isLoggedIn ? <div>Вход Выполнен</div> : <button onClick={signMessage}>Войти</button>}    
    </div>
}

export default Account;