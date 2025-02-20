import { childVariants } from '@/utils/animations'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const AnimatedWrapper = ({
    time,
    children,
}: {
    time: number
    children: ReactNode
}) => {
    return (
        <motion.div
            variants={childVariants(time)}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-3"
        >
            {children}
        </motion.div>
    )
}

export default AnimatedWrapper
