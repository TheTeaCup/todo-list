import React from "react";
import { HStack, Text, Flex, IconButton, Checkbox } from "@chakra-ui/react";
import { BsFillTrashFill } from "react-icons/bs";

export function TodoItem({ todo, toggleCheck, handleDelete }) {
    return (
        <HStack spacing="24px" px="20%" w="100%">
            <Checkbox
                isChecked={todo.checked}
                size="md"
                borderColor="green.400"
                key={todo.id}
                label={todo.label}
                checked={todo.checked}
                onChange={() => toggleCheck(todo.id)}
            />
            <Flex p={3} w="70%" h="50px" justifyContent="space-between">
                {todo.checked ? (
                    <Text as="del">{todo.label}</Text>
                ) : (
                    <Text> {todo.label}</Text>
                )}
            </Flex>
            <Flex w="10%">
                <IconButton
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleDelete(todo.id)}
                    icon={<BsFillTrashFill />}
                 aria-label={'delete'}/>
            </Flex>
        </HStack>
    );
}
