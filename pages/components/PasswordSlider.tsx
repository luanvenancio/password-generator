import * as Slider from "@radix-ui/react-slider";
import { useEffect, useState } from "react";
import { clsx } from "clsx";

interface PasswordLengthProp {
    getPasswordLength: (pwdLength: number) => void;
}

export function PasswordSlider({ getPasswordLength }: PasswordLengthProp) {
    const [pwdLength, setPwdLength] = useState(12);

    const handleLengthOnChange = (value: number[]) => {
        setPwdLength(value[0]);
    };

    useEffect(() => {
        getPasswordLength(pwdLength);
    }, [pwdLength]);

    return (
        <div className="w-full max-w-md mb-4 bg-zinc-900 border border-zinc-800 rounded-lg shadow-md p-4 sm:p-4 md:p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between">
                <label
                    htmlFor="pwd-length"
                    className="block mb-4 text-sm text-center font-semibold text-white dark:text-white"
                >
                    Length
                </label>
                <label
                    htmlFor="pwd-length"
                    className="block mb-4 text-sm text-right font-medium text-white dark:text-white"
                >
                    {pwdLength}
                </label>
            </div>

            <Slider.Root
                className="relative flex w-full touch-none select-none items-center"
                name="pwd-length"
                value={[pwdLength]}
                onValueChange={handleLengthOnChange}
                max={64}
                min={1}
                step={1}
                aria-label="Password Length"
            >
                <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-zinc-700 dark:bg-slate-800">
                    <Slider.Range className="absolute h-full rounded-full bg-violet-600 dark:bg-white" />
                </Slider.Track>
                <Slider.Thumb
                    className={clsx(
                        "block h-5 w-5 rounded-full bg-violet-600 border-violet-400 dark:bg-white hover:cursor-pointer",
                        "focus:outline-none focus-visible:ring focus-visible:ring-violet-500 focus-visible:ring-opacity-75"
                    )}
                />
            </Slider.Root>
        </div>
    );
}
