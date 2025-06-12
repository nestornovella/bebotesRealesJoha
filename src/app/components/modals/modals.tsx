import MainContainer from "@/app/helpers/containers/MainContainer";



export function BlurModal({ children, status = false, close }) {


    return (
        <div onClick={close} className={`fixed top-0 left-0 bottom-0 w-screen h-screen  backdrop-blur-sm z-[1000] ${!status && 'hidden'}`}>
            <MainContainer transition={false} >
                {children}
            </MainContainer>
        </div>
    )
}