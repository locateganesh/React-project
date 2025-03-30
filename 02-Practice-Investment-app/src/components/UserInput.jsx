import Input from "./Input";

export default function UserInput({onChangeInput, value}) {
    // const changeHandler = (e) => {
    //     onChangeInput(e.target.name, e.target.value);
    // };
    return <div id="user-input">
        <Input type="number" text="Initial Investment" value={value['initialInvestment']} onInputChange={(key, value) => onChangeInput(key, value)} />
        <Input type="number" text="Annual Investment" value={value['annualInvestment']} onInputChange={(key, value) => onChangeInput(key, value)} />
        <Input type="number" text="Expected Return" value={value['expectedReturn']} onInputChange={(key, value) => onChangeInput(key, value)} />
        <Input type="number" text="Duration" value={value['duration']} onInputChange={(key, value) => onChangeInput(key, value)} />
    </div>
}