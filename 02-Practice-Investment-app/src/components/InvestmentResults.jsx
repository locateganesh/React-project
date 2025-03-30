
import { calculateInvestmentResults, formatter } from '../util/investment'

export default function InvestmentResults({results}) {
    // console.log("results", results);

    const calcInvetments = calculateInvestmentResults(results);
    const initialInterest = calcInvetments[0].valueEndOfYear - calcInvetments[0].interest - calcInvetments[0].annualInvestment;
    
    return <table id="result">
        <thead>
            <tr>
                <th>Year</th>
                <th>Investment Value</th>
                <th>Interest (Year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
            </tr>
        </thead>
        <tbody>
            {calcInvetments.map((item) => {
                const totalInterest = item.valueEndOfYear - item.annualInvestment * item.year;
                const totalAmountInvested = item.valueEndOfYear - totalInterest;
                return (
                    <tr key={item.year}>
                        <td>{item.year}</td>
                        <td>{formatter.format(item.valueEndOfYear)}</td>
                        <td>{formatter.format(item.interest)}</td>
                        <td>{formatter.format(totalInterest)}</td>
                        <td>{formatter.format(totalAmountInvested)}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
}