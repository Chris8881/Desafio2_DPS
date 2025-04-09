import React from 'react';
import PreviewComponent from '../components/PreviewComponent';

export default function PreviewScreen({ route }) {
  const { photo, location } = route.params;

  return <PreviewComponent photo={photo} location={location} />;
}
