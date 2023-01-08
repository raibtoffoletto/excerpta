import { ListItem, ListItemText } from '@mui/material';
import Link from './Link';

export default function Results({
  results,
  amountLeft,
}: {
  results: SnippetDTO[];
  amountLeft: number;
}) {
  return (
    <>
      {results?.map?.((r) => (
        <Link
          key={`${r?.slug}`}
          slug={r?.slug}
          primary={r?.title}
          secondary={r?.description}
        />
      ))}

      {!!amountLeft && (
        <ListItem>
          <ListItemText
            primary={`...and ${amountLeft} more`}
            primaryTypographyProps={{
              color: 'grey.600',
              variant: 'caption',
              textAlign: 'center',
            }}
          />
        </ListItem>
      )}
    </>
  );
}
