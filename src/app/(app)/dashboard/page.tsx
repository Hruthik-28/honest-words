import { SignOutButton } from "@clerk/nextjs";

interface Props {}

function Page(props: Props) {
    const {} = props;

    return (
        <>
            <SignOutButton />
            <h1>DashBoard</h1>
        </>
    );
}

export default Page;
