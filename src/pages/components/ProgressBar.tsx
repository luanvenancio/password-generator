import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import { clsx } from "clsx";

interface ProgressBarProps {
    password: string;
}

type PwdProps = {
    id: number;
    value: string;
    contains: string[];
    length: number;
};

export function ProgressBar({ password }: ProgressBarProps) {
    const [pwdStrength, setPwdStrength] = useState<PwdProps>({
        id: 0,
        value: "",
        contains: [],
        length: 0,
    });

    const percentage = [25, 50, 75, 100];

    useEffect(() => {
        const strength = passwordStrength(password);
        setPwdStrength(strength);
    }, [password]);

    return (
        <div className="grid w-full justify-items-end items-end">
            <div>
                <span
                    className={clsx("font-bold text-right text-white text-sm", {
                        "text-red-500": percentage[pwdStrength.id] == 25,
                        "text-yellow-500": percentage[pwdStrength.id] == 50,
                        "text-green-300": percentage[pwdStrength.id] == 75,
                        "text-green-600": percentage[pwdStrength.id] == 100,
                    })}
                >
                    {pwdStrength.value}
                </span>
                <div className="h-2 rounded-xl bg-zinc-700 mt-1">
                    <div
                        role="progressbar"
                        aria-label="Password Strength"
                        aria-valuenow={pwdStrength.id}
                        className={clsx(
                            "h-2 rounded-xl bg-violet-600 transition-all",
                            {
                                "bg-red-500": percentage[pwdStrength.id] == 25,
                                "bg-yellow-500":
                                    percentage[pwdStrength.id] == 50,
                                "bg-green-300":
                                    percentage[pwdStrength.id] == 75,
                                "bg-green-600":
                                    percentage[pwdStrength.id] == 100,
                            }
                        )}
                        style={{
                            width: `${percentage[pwdStrength.id]}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
