import { 
	HOME_TOOL_NOTE,
	HOME_ORDER_DATA,
	HOME_ATENTION_TITLE,
	HOME_ATENTION_DESCRIPTION,
    HOME_README_TITLE,
    HOME_README_NOTE,
    HOME_README_YOUR,
    HOME_README_USE,
    HOME_README_YOUR_OPTION,
    FORM_ENV_REF_PASS_LABEL,
    HOME_README_PPR_EXAMPLE,
    HOME_README_REAL_PASS,
    HOME_README_WHERE_ASTERISK,
    HOME_README_EXAMPLE_REF01,
    HOME_README_EXAMPLE_PSS1A,
    HOME_README_EXAMPLE_PSS1B,
    HOME_README_EXAMPLE_REF02,
    HOME_README_EXAMPLE_PSS2A,
    HOME_README_EXAMPLE_PSS2B
} 							from "../config/consts"

function Readme() {

    const Example = ({optionNumber}) => {

        const pss1 = optionNumber === "1" ? HOME_README_EXAMPLE_PSS1A : HOME_README_EXAMPLE_PSS2A
        const pss2 = optionNumber === "1" ? HOME_README_EXAMPLE_PSS1B : HOME_README_EXAMPLE_PSS2B
        const className = "table bg-dark bg-opacity-50 table-sm table-bordered border border-secondary w-50 text-secondary my-2"

        return (
            <div>
                {HOME_README_PPR_EXAMPLE} {optionNumber}..
                <br/>
				<table className={className}>
					<tr>
                        <td className="px-2 text-center">{FORM_ENV_REF_PASS_LABEL}</td>
                        <td className="px-2 text-center border-start border-secondary">{HOME_README_REAL_PASS}</td>
                    </tr>
					<tr>
                        <td className="px-2">{HOME_README_EXAMPLE_REF01}</td>
                        <td className="px-2 border-start border-secondary">{pss1}</td>
                    </tr>
					<tr>
                        <td className="px-2">{HOME_README_EXAMPLE_REF02}</td>
                        <td className="px-2 border-start border-secondary">{pss2}</td>
                    </tr>
				</table>
                { optionNumber === "2" && HOME_README_WHERE_ASTERISK }
                { optionNumber === "2" && <div><br/></div> }
            </div>
        )
    }

    return (
        <div>
            <div className="alert bg-primary bg-opacity-10 border border-primary shadow-sm">
				<div className="text-primary fw-bold">{HOME_README_TITLE}</div>
				{HOME_README_USE}
				<hr />
				<strong>{HOME_README_NOTE}</strong>: { HOME_ORDER_DATA }. { HOME_TOOL_NOTE }
				<hr />
                <div className="mb-3">
                    <span className="fw-bold">{ HOME_ATENTION_TITLE }</span>
                    { HOME_ATENTION_DESCRIPTION }
                </div>
                <Example optionNumber="1" />
                <Example optionNumber="2" />
				{ HOME_README_YOUR_OPTION }
			</div>
			<div className="text-center fw-bold text-primary">{HOME_README_YOUR}</div>
        </div>
    )
}

export default Readme