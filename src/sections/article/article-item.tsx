import type { IPostProps } from 'src/types/blog';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';
import CardActionArea from '@mui/material/CardActionArea';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

type ArticleItemProps = {
  article: IPostProps;
};

export function ArticleItem({ article }: ArticleItemProps) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
        <Label variant="filled" sx={{ top: 16, right: 16, zIndex: 9, position: 'absolute' }}>
          {article.category}
        </Label>

        <CardActionArea component={RouterLink} href={paths.article.details(article.id)}>
          <Image src={article.coverUrl} alt={article.title} ratio="16/9" />
        </CardActionArea>
      </Box>

      <CardContent sx={{ gap: 1, display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
        <Link
          component={RouterLink}
          href={paths.article.details(article.id)}
          color="inherit"
          variant="h6"
          sx={(theme) => ({ ...theme.mixins.maxLine({ line: 2 }) })}
        >
          {article.title}
        </Link>

        <Typography
          variant="body2"
          sx={(theme) => ({ ...theme.mixins.maxLine({ line: 2 }), color: 'text.secondary' })}
        >
          {article.description}
        </Typography>

        <Box sx={{ mt: 'auto', pt: 2, gap: 1.5, display: 'flex', alignItems: 'center' }}>
          <Avatar src={article.author.avatarUrl} alt={article.author.name} />

          <ListItemText
            primary={article.author.name}
            secondary={`${fDate(article.createdAt)} • ${article.duration}`}
            slotProps={{
              primary: { sx: { typography: 'subtitle2' } },
              secondary: { sx: { typography: 'caption', color: 'text.disabled' } },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
