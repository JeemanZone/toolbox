import React, { ChangeEvent, useReducer, useState } from "react";
import { pwmap, pwmap_old } from "./PasswordMapperLogic";
import "./PasswordMapper.scss";

const versions = {
  OLD: "OLD",
  NEW: "NEW",
} as const;
type Version = (typeof versions)[keyof typeof versions];

function PasswordMapper() {
  const [result, setResult] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [lengthInput, setLengthInput] = useState("16");
  const [offsetInput, setOffsetInput] = useState("0");
  const [isPassword, togglePassword] = useReducer((state) => !state, true);
  const [version, setVersion] = useState<Version>(versions.NEW);

  const handleOkButtonClick = () => {
    const length = lengthInput.length > 0 ? Number(lengthInput) : 16;
    const offset = offsetInput.length > 0 ? Number(offsetInput) : 0;
    const func = version === versions.NEW ? pwmap : pwmap_old;
    func(keywordInput).then((value) => {
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
    if (e.key === "Enter") {
      handleOkButtonClick();
    }
  };
  const handleVersionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVersion(e.target.value as Version);
  };

  return (
    <div className="password-mapper">
      <h3>Password Mapper</h3>
      <table>
        <tbody>
          <tr>
            <th>Version:</th>
            <td colSpan={2}>
              <label>
                <input
                  type="radio"
                  name="version"
                  value={versions.NEW}
                  checked={version === versions.NEW}
                  onChange={handleVersionChange}
                />
                New
              </label>
              <label>
                <input
                  type="radio"
                  name="version"
                  value={versions.OLD}
                  checked={version === versions.OLD}
                  onChange={handleVersionChange}
                />
                Old
              </label>
            </td>
          </tr>
          <tr>
            <th>Keyword: </th>
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
            <th>Length: </th>
            <td colSpan={2}>
              <input
                type="text"
                value={lengthInput}
                onChange={handleLengthInputChange}
                onKeyUp={handleEnterKeyUp}
              />
            </td>
          </tr>
          <tr>
            <th>Offset: </th>
            <td colSpan={2}>
              <input
                type="text"
                value={offsetInput}
                onChange={handleOffsetInputChange}
                onKeyUp={handleEnterKeyUp}
              />
            </td>
          </tr>
          <tr>
            <th></th>
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
                <th>Password:</th>
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
