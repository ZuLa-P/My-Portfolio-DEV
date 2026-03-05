import { useState, useCallback } from "react";

export function useAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    type: "success",
    title: "",
    message: "",
  });

  const showAlert = useCallback(({ type = "success", title, message }) => {
    setAlertData({ type, title, message });
    setIsOpen(true);
  }, []);

  const closeAlert = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, alertData, showAlert, closeAlert };
}
