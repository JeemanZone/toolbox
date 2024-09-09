import { ChangeEvent, useReducer, useState } from "react";
import { pwmap } from "./PasswordMapperLogic";

function PasswordMapper() {
  const [result, setResult] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [lengthInput, setLengthInput] = useState("16");
  const [offsetInput, setOffsetInput] = useState("0");
  const [isPassword, togglePassword] = useReducer((state) => !state, true);
  const handleOkButtonClick = () => {
    const length = lengthInput.length > 0 ? Number(lengthInput) : 16;
    const offset = offsetInput.length > 0 ? Number(offsetInput) : 0;
    pwmap(keywordInput).then((value) => {
      setResult(value.substring(offset, offset + length));
    });
  };
  const handleClearButtonClick = () => {
    setResult("");
  };
  const handleCopyButtonClick = () => {
    navigator.clipboard
      .writeText(result)
      .then(() => {
        alert("Copied.");
      })
      .catch((reason) => {
        alert(`Failed: ${reason}`);
      });
  };
  const handleToggleButtonClick = () => {
    togglePassword();
  };
  const handleKeywordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywordInput(e.target.value);
  };
  const handleLengthInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0 || !Number.isNaN(e.target.value)) {
      setLengthInput(e.target.value);
    }
  };
  const handleOffsetInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0 || !Number.isNaN(e.target.value)) {
      setOffsetInput(e.target.value);
    }
  };
  const handleEnterKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (e.key === "Enter") {
      handleOkButtonClick();
    }
  };

  return (
    <div>
      <h3>Password Mapper</h3>
      <table>
        <tbody>
          <tr>
            <td>Keyword: </td>
            <td colSpan={2}>
              <input
                type={isPassword ? "password" : "text"}
                value={keywordInput}
                onChange={handleKeywordInputChange}
                onKeyUp={handleEnterKeyUp}
              />
            </td>
          </tr>
          <tr>
            <td>Length: </td>
            <td colSpan={2}>
              <input
                type="string"
                value={lengthInput}
                onChange={handleLengthInputChange}
                onKeyUp={handleEnterKeyUp}
              />
            </td>
          </tr>
          <tr>
            <td>Offset: </td>
            <td colSpan={2}>
              <input
                type="string"
                value={offsetInput}
                onChange={handleOffsetInputChange}
                onKeyUp={handleEnterKeyUp}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button onClick={handleOkButtonClick}>OK</button>
            </td>
            <td>
              <button onClick={handleToggleButtonClick}>
                {isPassword ? "Show keyword" : "Hide keyword"}
              </button>
            </td>
          </tr>
          {result.length > 0 && (
            <>
              <tr>
                <td>Password:</td>
                <td colSpan={2}>{result}</td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button onClick={handleCopyButtonClick}>Copy</button>
                </td>
                <td>
                  <button onClick={handleClearButtonClick}>Clear</button>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PasswordMapper;
