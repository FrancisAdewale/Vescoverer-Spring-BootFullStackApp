interface IProps {
    isVegan:  boolean
    shake: boolean
    handleChange : (e: React.ChangeEvent<HTMLInputElement>) => void
    callback : () => void
}

const Home : React.FC<IProps> = ({isVegan, shake, handleChange, callback}) => {

    return (
        <div className='question-card-container'>
            <div className="card bg-secondary" style={{ width: "18rem" }}>
                <img src={
                    require("../Images/vescoverer.png")
                    } className="card-img-top" alt="logo" />
                <div className="card-body">
                    <h5 className="card-title">Are You Vegan?</h5>
                    <br></br>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={isVegan}
                            onChange={(e) => handleChange(e)}
                            />
                        <span className="slider round"></span>
                    </label>
                    <br></br>
                    {
                isVegan ? <button className="btn btn-dark">Done</button>
                : <button className={shake ? "shake btn btn-dark" : "btn btn-dark"} onClick={callback}>Done</button>
            }
                </div>
            </div>
            </div>
    );

}

export default Home;