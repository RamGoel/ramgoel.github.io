import { Tooltip } from 'react-tooltip'

const CustomTooltip = ({
    id,
    background,
    color,
}: {
    id: string
    background?: string
    color?: string
}) => {
    return (
        <Tooltip
            id={id}
            className="max-w-[250px] z-[5000]"
            style={{
                color: color || 'black',
                background: background || 'lightgray',
                fontSize: '5px !important',
            }}
        />
    )
}

export default CustomTooltip
