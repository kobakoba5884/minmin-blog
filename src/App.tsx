import { InputField } from "./components/Elements/InputField";
import { Layout } from "./components/Layout";

function App() {
  return (
    <>
      <Layout>
        <div className="max-w-2xl mx-auto p-5">
          <h2 className="mb-5 font-bold text-4xl">All Post</h2>
          <div>
            <InputField placeholder="search" />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
