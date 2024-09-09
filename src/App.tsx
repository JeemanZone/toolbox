import "./App.css";

function App() {
  return (
    <>
      <div>
        别生气啦小宝贝，
        <a
          href="#"
          onClick={() => {
            alert("爱你啦，没有不理你的意思。");
          }}
        >
          点点这个试试
        </a>
        。
      </div>
    </>
  );
}

export default App;
