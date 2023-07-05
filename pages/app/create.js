import csrf from "@/utils/csrf";
import {sessionOptions} from "@/utils/sessionSettings";
import {withIronSessionSsr} from "iron-session/next";
import Navbar from "@/components/navbar";
import React, {useState} from "react";
import {
    Button,
    ButtonGroup,
    Divider,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Text,
    VStack
} from "@chakra-ui/react";
import {BiPlus, BiSave} from "react-icons/bi";
import {BsFillTrashFill} from "react-icons/bs";

export default function Home({user, dataProps}) {
    console.log(user)
    const [TodoList, setTodoList] = useState([
        {
            id: 0,
            value: "",
            checked: false
        }
    ]);
    const [error, setError] = useState(null);

    const [task, setTask] = useState("");

    const handleSubmit = async event => {
        event.preventDefault();

    };

    function handleDelete(id) {
        if (id === 0) {
            setError('Cannot remove the default item');
            setTimeout(() => {
                setError(null)
            }, 5000);
            return;
        }
        setTodoList(TodoList.filter((el) => el.id !== id));
    }

    function handleAddTask() {
        setTodoList([
            ...TodoList,
            {
                id: TodoList.length > 0 ? TodoList[TodoList.length - 1].id + 1 : 0,
                value: "",
                checked: false
            }
        ]);
    }


    return (
        <>

            <Navbar user={user}>
                <VStack w="100%" align="center">
                    <Heading align="center" fontSize={24} flexGrow={1} mb={5}>
                        Create a new ToDo List
                    </Heading>

                    <form onSubmit={handleSubmit}>

                        {TodoList.map((todoItem) => (
                            <InputGroup key={todoItem.id} mb={4}>
                                <InputLeftAddon>
                                    {todoItem.id + 1}
                                </InputLeftAddon>
                                <Input type='text'/>
                                <InputRightElement width='3rem'>
                                    <IconButton
                                        h='1.75rem' size='sm'
                                        colorScheme="red"
                                        variant="outline"
                                        onClick={() => handleDelete(todoItem.id)}
                                        icon={<BsFillTrashFill/>}
                                        aria-label={'delete'}/>
                                </InputRightElement>
                            </InputGroup>

                        ))}

                        <Divider py="10px"/>

                        {error ?
                            <Text
                                mt={2}
                                align="center"
                                fontSize={{base: 'sm', sm: 'md'}}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                bgClip="text">
                                {error}
                            </Text> : <br/>
                        }

                        <center>
                            <ButtonGroup mt={2} spacing='6' align="center">
                                <Button leftIcon={<BiPlus/>} aria-label='Add Task' onClick={handleAddTask}>
                                    Add Task
                                </Button>

                                <Button rightIcon={<BiSave/>} aria-label='Save List' type={'submit'}>
                                    Save List
                                </Button>
                            </ButtonGroup>
                        </center>

                    </form>
                </VStack>
            </Navbar>

        </>
    )
}

export const getServerSideProps = withIronSessionSsr(async function ({req, res}) {
    const user = req.session.user;

    await csrf(req, res);

    if (user === undefined) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    } else {
        return {
            props: {user: req.session.user, csrfToken: req.csrfToken()}
        };
    }
}, sessionOptions)