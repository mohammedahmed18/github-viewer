const { createContext, useState, useEffect, useContext } = require("react");

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [shown, setShown] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (shown) {
      setTimeout(() => {
        setShown(false);
      }, 3000);
    }
  }, [shown]);
  const showError = async (msg) => {
    setMsg(msg);
    setShown(true);
  };
  return (
    <AlertContext.Provider value={{ showError }}>
      <>
        <div
          className={`alert
          backdrop-blur-md
          alert-error
          ${shown ? "opacity-100 scale-100 " : "opacity-0 scale-0"
            } fixed right-5 top-16 mt-5`}
          style={{ transition: "0.5s", zIndex: "99" }}
        >
          {msg}
        </div>
        {children}
      </>
    </AlertContext.Provider>
  );
};
const useAlerts = () => useContext(AlertContext)
export default useAlerts