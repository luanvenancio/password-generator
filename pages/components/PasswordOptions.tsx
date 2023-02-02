import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { generatePassword } from "../utils/generate-password";
import { options } from "../utils/options";
import * as Switch from "@radix-ui/react-switch";
import * as Slider from "@radix-ui/react-slider";
import { clsx } from "clsx";

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

    const handleLengthOnChange = (value: number[]) => {
        setPwdLength(value[0]);
    };

    useEffect(() => {
        onOptionsChanged(pwdOptions, pwdLength);
    }, [pwdOptions, pwdLength]);

    return (
        <>
            <div className="w-full max-w-md mb-4 bg-zinc-900 border border-zinc-800 rounded-lg shadow-md p-4 sm:p-4 md:p-6 dark:bg-gray-800 dark:border-gray-700">
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
                <Slider.Root
                    className="SliderRoot"
                    name="pwd-length"
                    value={[pwdLength]}
                    onValueChange={handleLengthOnChange}
                    max={64}
                    step={1}
                    aria-label="Password Length"
                >
                    <Slider.Track className="SliderTrack">
                        <Slider.Range className="SliderRange" />
                    </Slider.Track>
                    <Slider.Thumb className="SliderThumb" />
                </Slider.Root>
            </div>
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-lg">
                <p className="block py-6 ml-6 text-sm text-left font-semibold text-slate-200 dark:text-white">
                    Includes
                </p>
                <hr className="h-px mb-2 bg-zinc-800 border-0"></hr>
                {options.map(({ name }: any, index: number) => {
                    return (
                        <div
                            className="flex items-center px-4 sm:pl-4 md:pl-6 mb-2 hover:bg-zinc-700"
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
                                onCheckedChange={() =>
                                    handleCheckBoxOnChange(index)
                                }
                                className={clsx(
                                    "group",
                                    "data-[state=checked]:bg-purple-600",
                                    "data-[state=unchecked]:bg-gray-200 dark:bg-gray-800",
                                    "relative inline-flex h-[24px] w-[44px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
                                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
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
        </>
    );
}
