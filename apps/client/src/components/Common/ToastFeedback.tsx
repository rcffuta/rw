"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

type ToastFeedbackProps = {
    message: string;
    id?: string;
    duration?: number;
    type?: "success" | "error";
};

export default function ToastFeedback(props: ToastFeedbackProps) {
    const {
        message,
        id = "toastFeedBack",
        duration = 1000,
        type = "success",
    } = props;

    useEffect(() => {
        function toastIt() {
            if (type === "error")
                return toast.error(message, {
                    id,
                    duration,
                });

            return toast.success(message, {
                id,
                duration,
            });
        }

        toastIt();
    }, [message, id, duration]);
    return null;
}
