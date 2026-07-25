import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PortfolioGraph from "./components/PortfolioGraph";
import Inspector from "./components/Inspector";
import Metrics from "./components/Metrics";

export default function App() {
    return (
        <div className="h-screen w-screen bg-[#0A0C10] text-white flex flex-col">

            <Header />

            <div className="flex flex-1 overflow-hidden">

                <Sidebar />

                <PortfolioGraph />

                <Inspector />

            </div>

            <Metrics />

        </div>
    );
}