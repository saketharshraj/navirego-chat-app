import {Box, Skeleton} from "@mui/material";

const ChatLoader = () =>  {

    return (
        <>
            <Box mb={3} pr={2} width={"100%"} display={"flex"} justifyContent={"space-between"}>
                <Box width={"40px"}>
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                </Box>

                <Box ml={1.5} width={"calc(100% - 60px)"} pt={0.5}>
                    <Skeleton animation="wave" variant="rounded" width={100} height={20} />
                    <Box mb={1} />
                    <Skeleton animation="wave" variant="rounded" width={"100%"} height={100} />
                </Box>
            </Box>
            <Box mb={5} pr={2} width={"100%"} display={"flex"} justifyContent={"space-between"}>
                <Box width={"40px"}>
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                </Box>

                <Box ml={1.5} width={"calc(100% - 60px)"} pt={0.5}>
                    <Skeleton animation="wave" variant="rounded" width={100} height={20} />
                    <Box mb={1} />
                    <Skeleton animation="wave" variant="rounded" width={"100%"} height={100} />
                </Box>
            </Box>
        </>
    );
}

export default ChatLoader;



