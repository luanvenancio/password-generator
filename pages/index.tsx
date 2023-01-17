import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
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
        <div className={styles.container}>
            <Head>
                <title>Password Generator</title>
                <meta name="description" content="Password Generator App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className="text-5xl font-semibold text-center">
                    Password Generator
                </h1>

                <div className="container mx-auto">
                    <button
                        type="button"
                        id="copy-button"
                        className={styles.button}
                        onClick={() => {
                            navigator.clipboard.writeText(password as string);
                        }}
                    >
                        Copy
                    </button>

                    <button
                        type="button"
                        id="refresh-button"
                        className={styles.button}
                        onClickCapture={refreshClickHandler}
                    >
                        Refresh
                    </button>

                    <p className={styles.description}>{password}</p>
                </div>

                <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <label
                        htmlFor="pwd-length"
                        className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white"
                    >
                        {pwdLength}
                    </label>
                    <input
                        type="range"
                        id="pwd-length"
                        name="pwd-length"
                        min="4"
                        max="64"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        value={pwdLength}
                        onChange={handleLengthOnChange}
                    />

                    {options.map(({ name }, index) => {
                        return (
                            <div
                                className="flex items-center pl-4 m-2 border border-gray-200 rounded hover:bg-gray-50 dark:border-gray-700"
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
                                    className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {name}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{" "}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
};

export default Home;
