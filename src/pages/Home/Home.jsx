import {useState, useEffect} from "react";
import {Grid, Hidden, Box} from "@mui/material";

import Navbar from "../../components/Navbar";
import AllChats from "./components/AllChats";

const Home = () =>  {

    const [chats, setChats] = useState([])

    const [current, setCurrent] = useState(null)
    const [allChatsLoading, setAllChatsLoading] = useState(false);
    const [chatLoading, setChatLoading] = useState(false)

    return (
        <>
            <Navbar />
            <Grid container spacing={0} height={'auto'}>
                <Hidden mdDown>
                    <Grid item xs={0} md={3}>
                        <AllChats
                            p={1} br={"12px"} height={"calc(100vh - 130px)"}
                            chats={chats} allChatsLoading={allChatsLoading}
                            current={current} setCurrent={setCurrent}
                            chatLoading={chatLoading}
                        />
                    </Grid>
                </Hidden>

                <Grid item xs={12} md={9}>
                    <Box width={"100%"} height={"100vh"} p={1} pl={{xs: 1, md: 0.5}}>
                        {/*<QueryEditor*/}
                        {/*    queryOutput={queryOutput} selectedQueryId={selectedQueryId}*/}
                        {/*    isQueryExecuted={isQueryExecuted} setIsQueryExecuted={setIsQueryExecuted}*/}
                        {/*    setQueryOutput={setQueryOutput} setCurrentPage={setCurrentPage}*/}
                        {/*/>*/}
                        {/*<QueryOutput*/}
                        {/*    queryOutput={queryOutput}*/}
                        {/*    currentPage={currentPage} setCurrentPage={setCurrentPage}*/}
                        {/*    pageSize={pageSize} setPageSize={setPageSize}*/}
                        {/*/>*/}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;
