/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
import * as vscode from 'vscode';
import { ApiWrapper } from './apiWrapper';
import { CreateJobDialog } from './dialogs/createJobDialog';
import { CreateStepDialog } from './dialogs/createStepDialog';

/**
 * The main controller class that initializes the extension
 */
export class MainController {
    protected _apiWrapper: ApiWrapper;
    protected _context: vscode.ExtensionContext;

    // PUBLIC METHODS //////////////////////////////////////////////////////
    public constructor(context: vscode.ExtensionContext, apiWrapper?: ApiWrapper) {
        this._apiWrapper = apiWrapper || new ApiWrapper();
        this._context = context;

        console.log('Got: ' + apiWrapper);
    }

    /**
     * Deactivates the extension
     */
    public deactivate(): void {
    }

    public activate(): void {
        this._apiWrapper.registerWebviewProvider('data-management-agent', webview => {
            webview.html = '<div><h1>SQL Agent</h1></div>';
        });

        vscode.commands.registerCommand('agent.openCreateJobDialog', (ownerUri: string) => {
            let dialog = new CreateJobDialog(ownerUri);
            dialog.showDialog();
        });
        vscode.commands.registerCommand('agent.openNewStepDialog', (ownerUri: string, jobId: string, server: string) => {
			let dialog = new CreateStepDialog(ownerUri, jobId, server);
			dialog.openNewStepDialog();
		});
	}

	 private updateJobStepDialog() {

	 }
}
