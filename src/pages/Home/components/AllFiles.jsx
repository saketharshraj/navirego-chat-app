import {
    Box,
    CircularProgress,
    Dialog,
    Grid,
    useMediaQuery,
} from '@mui/material';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import { useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getAllFiles } from '../../../api/getAllFiles';
import { useSnackbar } from 'notistack';
import FileMessage from '../../../components/FileMessage';

const AllFiles = ({ current }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const handleClickOpen = () => {
        fetchData();
    };
    const handleClose = () => {
        setModal(false);
    };

    useEffect(() => {
        setFiles([]);
    }, [current]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getAllFiles(current?._id);

            if (response.success && response.data.length > 0) {
                setModal(true);
                setFiles(response.data);
            } else {
                enqueueSnackbar('No files found in this chat', {
                    variant: 'info',
                });
            }
        } catch (error) {
            console.error('Error fetching files:', error);
        } finally {
            setLoading(false);
        }
    };

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <>
            <IconButton onClick={handleClickOpen} disabled={!current?._id}>
                {loading ? (
                    <CircularProgress color={'secondary'} size={23.2} />
                ) : (
                    <FileOpenOutlinedIcon color={'secondary'} />
                )}
            </IconButton>

            <Dialog
                fullScreen={isMobile}
                maxWidth={'md'}
                open={modal}
                onClose={handleClose}
            >
                <Box
                    pt={2}
                    pb={3}
                    bgcolor={'#FFF'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={isMobile ? '100%' : '700px'}
                >
                    <Box
                        width={'100%'}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid #333',
                        }}
                        pb={1.5}
                        pl={3}
                        pr={2}
                    >
                        <Box fontWeight={600} fontSize={'24px'}>
                            Files
                        </Box>
                        <IconButton onClick={handleClose}>
                            <CloseIcon sx={{ color: 'red' }} />
                        </IconButton>
                    </Box>
                    <Box width={'100%'} mt={2} px={3}>
                        <Grid container spacing={4}>
                            {files
                                .filter((file) => file.fileUrl)
                                ?.map((each, index) => (
                                    <Grid
                                        key={index}
                                        item
                                        xs={6}
                                        md={4}
                                        height={'100%'}
                                    >
                                        <FileMessage
                                            allfiles={true}
                                            message={each?.message}
                                            fileUrl={each?.fileUrl}
                                            fileName={'File'}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
};

export default AllFiles;

