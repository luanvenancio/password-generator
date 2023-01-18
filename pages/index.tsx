import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import { BiRefresh, BiCopy } from "react-icons/bi";
import { options } from "./utils/options";

const Home: NextPage = () => {
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const special = "!\"#$%&'*+-_,./:;=?@\\^`|~[]{}()<>";

    const [checkedState, setCheckedState] = useState([
        true,
        true,
        false,
        false,
    ]);

    const [pwdLength, setPwdLength] = useState(12);
    const [password, setPassword] = useState<string>();

    const generatePassword = (checkedState: boolean[]) => {
        let password = "";
        let pool = "";

        if (checkedState[0]) {
            pool += upperCase;
        }

        if (checkedState[1]) {
            pool += lowerCase;
        }

        if (checkedState[2]) {
            pool += digits;
        }

        if (checkedState[3]) {
            pool += special;
        }

        console.log(pool);
        if (!pool) {
            throw new TypeError("At least one rule for pools must be true");
        }

        for (let i = 0; i < pwdLength; i++) {
            password += pool.charAt(Math.random() * pool.length);
        }

        console.log(password);
        setPassword(password);
    };

    const handleCheckBoxOnChange = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
    };

    const handleLengthOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPwdLength(e.target.value as unknown as number);
    };

    const refreshClickHandler = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        generatePassword(checkedState);
    };

    useEffect(() => {
        generatePassword(checkedState);
    }, [checkedState, pwdLength]);

    return (
        <div className="bg-[#0D1116] py-0 px-8">
            <Head>
                <title>Password Generator</title>
                <meta name="description" content="Password Generator App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="py-16 px-0 flex flex-col items-center justify-center min-h-screen">
                <div className="w-full max-w-md mb-8 bg-[#161B21] border border-[#252A31] rounded-lg shadow-md p-4 sm:p-4 md:p-6 dark:bg-gray-800 dark:border-gray-700">
                    <h1 className="mb-4 text-3xl font-semibold text-left text-white">
                        Generate Password
                    </h1>

                    <div className="grid grid-cols-3 gap-2 w-full mb-2 p-2 bg-[#20262D] border border-[#252A31] rounded-lg shadow-md sm:py-2 sm:px-4 md:py-6 md:px-4 dark:bg-gray-800 dark:border-gray-70">
                        <p className="col-span-2 break-all text-2xl self-center font-medium text-left text-white">
                            {password}
                        </p>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                id="copy-button"
                                className="text-white hover:text-gray-400 font-medium rounded-lg text-3xl p-2.5 text-center inline-flex items-center"
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
                                className="text-white hover:text-gray-400 font-medium rounded-lg text-3xl p-2.5 text-center inline-flex items-center transition ease-in-out delay-200  hover:rotate-90"
                                onClickCapture={refreshClickHandler}
                            >
                                <BiRefresh />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-md mb-2 bg-[#161B21] border border-[#252A31] rounded-lg shadow-md p-4 sm:p-4 md:p-6 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-between">
                        <label
                            htmlFor="pwd-length"
                            className="block mb-2 text-sm text-center font-semibold text-white dark:text-white"
                        >
                            Length
                        </label>
                        <label
                            htmlFor="pwd-length"
                            className="block mb-2 text-sm text-right font-medium text-white dark:text-white"
                        >
                            {pwdLength}
                        </label>
                    </div>
                    <input
                        type="range"
                        id="pwd-length"
                        name="pwd-length"
                        min="4"
                        max="64"
                        className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"
                        value={pwdLength}
                        onChange={handleLengthOnChange}
                    />
                </div>
                <div className="w-full max-w-md">
                    <p className="block mb-2 ml-4 mt-2 text-sm text-left font-semibold text-slate-200 dark:text-white">
                        Includes
                    </p>
                    {options.map(({ name }, index) => {
                        return (
                            <div
                                className="flex items-center pl-4 sm:pl-4 md:pl-6 mt-2 bg-[#161B21] border border-[#252A31] rounded hover:bg-[#1d242c] dark:border-gray-700"
                                key={index}
                            >
                                <input
                                    type="checkbox"
                                    id={`checkbox-${index}`}
                                    name={name}
                                    value={name}
                                    checked={checkedState[index]}
                                    className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={() =>
                                        handleCheckBoxOnChange(index)
                                    }
                                />
                                <label
                                    htmlFor={name}
                                    className="w-full py-4 ml-2 text-sm font-medium text-white dark:text-gray-300"
                                >
                                    {name}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default Home;
