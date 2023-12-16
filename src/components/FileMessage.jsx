import { Box } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { Link } from 'react-router-dom';

const FileMessage = ({ allfiles, message, fileUrl, fileName }) => {
    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            pt={allfiles ? 0 : message?.length > 0 ? 1 : 0}
        >
            <ArticleOutlinedIcon sx={{ fontSize: '50px' }} />
            <Box ml={0.5} fontWeight={500} fontSize={'16px'}>
                <Box>{fileName}</Box>
                <Link
                    to={fileUrl}
                    target='_blank'
                    style={{
                        textDecoration: 'none',
                        color: '#2026d2',
                        fontSize: '14px',
                    }}
                >
                    Open
                </Link>
            </Box>
        </Box>
    );
};

export default FileMessage;

