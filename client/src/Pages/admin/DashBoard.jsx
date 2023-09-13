import RatingPage from "./components/RatingPage";

function DashBoard() {
    return <div>
        <h1>DashBoard</h1>
        <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 0 20px 1px rgba(0,0,0,0.1)', padding: '10px' }}>
            <RatingPage></RatingPage>
        </div>
    </div>;
}

export default DashBoard;