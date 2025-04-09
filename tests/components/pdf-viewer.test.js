// Copyright (c) 2017 PlanGrid, Inc.
import { readFileSync } from 'fs'

import React from 'react';
import { PDFJS } from 'pdfjs-dist/build/pdf.combined'
import { mount } from 'enzyme';
import { createWaitForElement } from 'enzyme-wait';
import { PDFPage } from 'components/drivers/pdf-viewer';
import PDFDriver from '../../src/components/drivers/pdf-viewer'

describe('pdf-viewer', () => {
  let spyFetchAndRender, spyPdfjsGetDocument;
  beforeEach(() => {
    spyFetchAndRender = jest.spyOn(PDFPage.prototype, 'fetchAndRenderPage').mockImplementation(() => {});
    spyPdfjsGetDocument = jest.spyOn(PDFJS, 'getDocument');
  })

  afterEach(() => {
    spyFetchAndRender.mockRestore();
    spyPdfjsGetDocument.mockRestore();
  })

  it('renders without crashing', () => {
    mount(
      <PDFPage fileType='fake' filePath='fake/path' />
    );
  });

  it('calls fetchAndRenderPage on mount with visibility check disabled', () => {
   mount(
      <PDFPage fileType='fake' filePath='fake/path' disableVisibilityCheck />
    );
    expect(spyFetchAndRender).toHaveBeenCalled();
  });

  it('does not call fetchAndRenderPage on mount with visibility check enabled', () => {
    mount(
      <PDFPage fileType='fake' filePath='fake/path' disableVisibilityCheck={false} />
    );
    expect(spyFetchAndRender).not.toHaveBeenCalled();
  });

  it('does not call onError for a successful file', async () => {
    function onError(error) {
      throw Error('onError should not be called');
    };
    const fileContents = readFileSync('./example_files/sample.pdf');
    mount(
      <PDFDriver fileType='pdf' filePath={fileContents} onError={onError} />
    );
  });

  it('does call onError for a missing file', async () => {
    function mockGetDocument(path) {
      return Promise.reject(Error('the world is not enough'));
    }
    spyPdfjsGetDocument.mockImplementation(mockGetDocument);
    const mockErrorHandler = jest.fn();
    mount(
      <PDFDriver fileType='pdf' filePath='./example_files/missing_file.pdf' onError={mockErrorHandler} />
    );
  });

});
