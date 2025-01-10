export const containerVariants = {
    visible: {
        transition: {
            staggerChildren: 1,
        },
    },
}

export const childVariants = (delay: number) => ({
    hidden: {
        filter: 'blur(10px)',
    },
    visible: {
        filter: 'blur(0px)',
        transition: {
            duration: 0.5,
            delay,
        },
    },
})
