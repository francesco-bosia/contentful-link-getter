import React, { useState, useEffect } from 'react';
import { Button, Flex, List, ListItem, Note, Paragraph, SectionHeading, TextLink } from '@contentful/f36-components';
import { useSDK } from '@contentful/react-apps-toolkit';

const CONTENTFUL_FIELD_NAME = "linkedAsset"

interface AssetUrl {
  de: string,
  en: string
}

interface LinkArguments {
  hrefLink: string;
  text: string;
}

function LinkComponent(props: LinkArguments) {
  return (
    <TextLink
      href={props.hrefLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      <b>{props.text}</b>
    </TextLink>
  )
}

const Sidebar = () => {
  const sdk = useSDK();

  const [links, setLinks] = useState<AssetUrl>()

  const getLink = () => {
    sdk.dialogs.selectSingleAsset().then(asset => setLinks({
      de: "https:" + asset.fields["file"]["de"].url,
      en: "https:" + asset.fields["file"]["en-US"].url
    }))
  }
  console.log("Links:", links)
  // Render the metrics with Forma36 components
  return (
    <Flex flexDirection="column" gap="spacing">
      {links && <SectionHeading>Links to the selected asset</SectionHeading>}
      <List>

        {links?.de && <ListItem key="de">
          <LinkComponent
            text="Link in German"
            hrefLink={links?.de as string}
          />
        </ListItem>
        }
        {links?.en && <ListItem key="en">
          <LinkComponent
            text="Link in English"
            hrefLink={links?.en as string}
          />
        </ListItem>
        }
        <Button style={{ marginTop: '20px' }} onClick={getLink} >
          Select Asset to Link
        </Button>
      </List>
    </Flex>
  );
};

export default Sidebar;