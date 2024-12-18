export const containerVariants = {
    visible: {
        transition: {
            staggerChildren: 0.02,
        },
    },
}

export const childVariants = {
    hidden: {
        filter: 'blur(10px)',
    },
    visible: {
        filter: 'blur(0px)',
        transition: {
            duration: 0.3,
        },
    },
}
