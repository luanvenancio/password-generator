import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import { BiRefresh, BiCopy } from "react-icons/bi";
import { generatePassword } from "./utils/generate-password";
import { PasswordOptions } from "./components/PasswordOptions";

const Home: NextPage = () => {
    const [password, setPassword] = useState<string>();

    const refreshClickHandler = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        //setPassword(newPassword);
    };

    function handleNewPassword(pwdOptions: boolean[], pwdLength: number) {
        const newPassword = generatePassword(pwdOptions, pwdLength);
        setPassword(newPassword);
    }

    return (
        <div className="bg-background py-0 px-8">
            <Head>
                <title>Password Generator</title>
                <meta name="description" content="Password Generator App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="py-16 px-0 flex flex-col items-center justify-center min-h-screen">
                <h1 className="mb-4 text-3xl font-semibold text-left text-white">
                    Generate Password
                </h1>

                <div className="w-full max-w-md mb-4 bg-zinc-900 border border-zinc-800 rounded-lg shadow-md p-4 sm:p-4 md:p-6">
                    <p className="block mb-4 text-sm text-left font-semibold text-white dark:text-white">
                        New Password
                    </p>
                    <div className="grid grid-cols-3 gap-2 w-full mb-2 p-1 bg-background border border-zinc-800 rounded-lg shadow-md sm:py-1 sm:px-4 md:py-2 md:px-4">
                        <p className="col-span-2 break-all text-lg self-center font-medium text-left text-white">
                            {password}
                        </p>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                id="copy-button"
                                className="text-white hover:text-gray-400 font-medium rounded-lg text-2xl p-2.5 text-center inline-flex items-center"
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        password as string
                                    );
                                }}
                            >
                                <BiCopy />
                            </button>

                            <button
                                type="button"
                                id="refresh-button"
                                className="text-white hover:text-gray-400 font-medium rounded-lg text-2xl p-2.5 text-center inline-flex items-center transition ease-in-out delay-200  focus:rotate-90"
                                onClickCapture={refreshClickHandler}
                            >
                                <BiRefresh />
                            </button>
                        </div>
                    </div>
                </div>
                <PasswordOptions onOptionsChanged={handleNewPassword} />
            </main>
        </div>
    );
};

export default Home;
