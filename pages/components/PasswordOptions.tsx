import { useEffect, useState } from "react";
import { options } from "../utils/options";
import * as Switch from "@radix-ui/react-switch";
import { clsx } from "clsx";

interface PasswordOptionsProp {
    onOptionsChanged: (pwdOption: boolean[]) => void;
}

export function PasswordOptions({ onOptionsChanged }: PasswordOptionsProp) {
    const [pwdOptions, setPwdOptions] = useState([true, true, false, false]);

    const handleCheckBoxOnChange = (pwdOption: number) => {
        const updatedOptions = pwdOptions.map((item, index) =>
            index === pwdOption ? !item : item
        );

        setPwdOptions(updatedOptions);
    };

    useEffect(() => {
        onOptionsChanged(pwdOptions);
    }, [pwdOptions]);

    return (
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-lg pb-4">
            <p className="block py-6 ml-6 text-sm text-left font-semibold text-white dark:text-white">
                Includes
            </p>
            <hr className="h-px mb-2 bg-zinc-800 border-0"></hr>
            {options.map(({ name }: any, index: number) => {
                return (
                    <div
                        className="flex items-center px-4 sm:pl-4 md:pl-6 mb-2 hover:bg-zinc-800"
                        key={index}
                    >
                        <label
                            htmlFor={name}
                            className="w-full py-4 ml-2 text-sm font-medium text-white dark:text-gray-300"
                        >
                            {name}
                        </label>
                        <Switch.Root
                            id={name}
                            name={name}
                            value={name}
                            checked={pwdOptions[index]}
                            disabled={
                                pwdOptions.filter(Boolean).length === 1 &&
                                pwdOptions[index] === true
                                    ? true
                                    : false
                            }
                            onCheckedChange={() =>
                                handleCheckBoxOnChange(index)
                            }
                            className={clsx(
                                "group",
                                "data-[disabled]:bg-violet-400",
                                "data-[state=checked]:bg-violet-600",
                                "data-[state=unchecked]:bg-zinc-700 dark:bg-gray-800",
                                "relative inline-flex h-[24px] w-[44px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
                                "focus:outline-none focus-visible:ring focus-visible:ring-violet-500 focus-visible:ring-opacity-75"
                            )}
                        >
                            <Switch.Thumb
                                className={clsx(
                                    "data-[state=checked]:translate-x-5",
                                    "data-[state=unchecked]:translate-x-0",
                                    "pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                                )}
                            />
                        </Switch.Root>
                    </div>
                );
            })}
        </div>
    );
}
