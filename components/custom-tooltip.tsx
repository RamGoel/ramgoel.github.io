import { Tooltip } from 'react-tooltip'

const CustomTooltip = ({ id }: { id: string }) => {
    return (
        <Tooltip
            id={id}
            style={{
                color: 'black',
                background: 'lightgray',
                fontSize: '5px !important',
            }}
        />
    )
}

export default CustomTooltip
