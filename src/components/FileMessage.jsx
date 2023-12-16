import { Box } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { Link } from 'react-router-dom';

const FileMessage = ({ fileUrl, fileName }) => {
    return (
        <Box display={'flex'} alignItems={'center'}>
            <ArticleOutlinedIcon sx={{fontSize: "50px"}}/>
            <Box ml={0.5}>
                <Box>{fileName}</Box>
                <Link to={fileUrl} target='_blank' style={{textDecoration: "none", color: "#2026d2"}}>Open</Link>
            </Box>
        </Box>
    );
};

export default FileMessage;

