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
                <h1 className={styles.title}>Password Generator</h1>

                <div>
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

                <label htmlFor="pwd-length">{pwdLength}</label>
                <input
                    type="range"
                    id="pwd-length"
                    name="pwd-length"
                    min="4"
                    max="64"
                    value={pwdLength}
                    onChange={handleLengthOnChange}
                />

                <div className={styles.grid}>
                    {options.map(({ name }, index) => {
                        return (
                            <div className={styles.card} key={index}>
                                <input
                                    type="checkbox"
                                    id={`checkbox-${index}`}
                                    name={name}
                                    value={name}
                                    checked={checkedState[index]}
                                    onChange={() =>
                                        handleCheckBoxOnChange(index)
                                    }
                                />
                                <label htmlFor={name}>{name}</label>
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
