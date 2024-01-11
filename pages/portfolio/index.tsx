import { redirect } from "next/navigation"
const PORTFOLIO_URL =`https://drive.google.com/drive/folders/15wjgqHYQH-hOEtPKaGskWw-lvSxKbE74?usp=drive_link`
const Page = (props: any) => <></>

export default Page;

export function getServerSideProps() {
    return {
        redirect: {
            permanent: true,
            destination: PORTFOLIO_URL
        }
    }
}