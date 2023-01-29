import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { generatePassword } from "../utils/generate-password";
import { options } from "../utils/options";

type OptionsProp = Array<{
    name: String;
    value: String;
}>;

interface PasswordOptionsProp {
    onOptionsChanged: (pwdOption: boolean[], pwdLength: number) => void;
}

export function PasswordOptions({ onOptionsChanged }: PasswordOptionsProp) {
    const [pwdOptions, setPwdOptions] = useState([true, true, false, false]);

    const [pwdLength, setPwdLength] = useState(12);

    const handleCheckBoxOnChange = (pwdOption: number) => {
        const updatedOptions = pwdOptions.map((item, index) =>
            index === pwdOption ? !item : item
        );

        setPwdOptions(updatedOptions);
    };

    const handleLengthOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPwdLength(e.target.value as unknown as number);
    };

    useEffect(() => {
        onOptionsChanged(pwdOptions, pwdLength);
    }, [pwdOptions, pwdLength]);

    return (
        <>
            <div className="w-full max-w-md mb-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-md p-4 sm:p-4 md:p-6 dark:bg-gray-800 dark:border-gray-700">
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
                {options.map(({ name }: any, index: number) => {
                    return (
                        <div
                            className="flex items-center pl-4 sm:pl-4 md:pl-6 mt-2 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-700"
                            key={index}
                        >
                            <input
                                type="checkbox"
                                id={`checkbox-${index}`}
                                name={name}
                                value={name}
                                checked={pwdOptions[index]}
                                className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                onChange={() => handleCheckBoxOnChange(index)}
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
        </>
    );
}
