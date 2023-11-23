import { Card, Image } from 'semantic-ui-react';
import { GitHubRepo } from '../../@types/GitHubRepo';

type ReposResultsProps = {
  results: GitHubRepo[];
};

function ReposResults({ results }: ReposResultsProps) {
  return (
    <div>
      <Card.Group>
        {results.map((repo) => (
          <Card key={repo.id}>
            <Image
              src={repo.owner.avatar_url}
              alt={`${repo.owner.login}'s avatar`}
            />
            <Card.Content>
              <Card.Header>{repo.name}</Card.Header>
              <Card.Meta>
                <span className="owner">{`Créateur: ${repo.owner.login}`}</span>
              </Card.Meta>
              <Card.Description>
                {repo.description || 'Aucune description'}
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}

export default ReposResults;
