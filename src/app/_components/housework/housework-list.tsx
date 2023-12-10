import { api } from "~/trpc/react";
import { LoadingIndicator } from "../loading-indicator";
import { ErrorMessageBox } from "../message-box";
import { HouseWorkRow } from "./housework-row";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { type HouseWork } from "./type";

export function HouseWorkList() {
  const { data, isLoading, isError } = api.houseWork.all.useQuery();
  const houseWorks = (data ?? []) as HouseWork[];

  const renderHouseWork = (
    houseWork: HouseWork,
    level = 0,
  ): React.ReactNode[] => {
    const children = houseWorks.filter(
      (child) => child.parent === houseWork.id,
    );
    return [
      <HouseWorkRow key={houseWork.id} houseWork={houseWork} level={level} />,
      children.flatMap((child: HouseWork) => renderHouseWork(child, level + 1)),
    ];
  };

  const rootHouseWorks = houseWorks
    .filter((h) => h.parent == null)
    .flatMap((houseWork) => renderHouseWork(houseWork));

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorMessageBox />;

  return (
    <>
      <HStack>
        <Link href="/">
          <ArrowBackIcon />
        </Link>
        <Text fontSize="large">HouseWorks</Text>
      </HStack>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Name</Th>
            <Th>Span (Day)</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>{rootHouseWorks}</Tbody>
      </Table>
    </>
  );
}
