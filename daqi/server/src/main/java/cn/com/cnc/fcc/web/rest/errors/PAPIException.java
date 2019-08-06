package cn.com.cnc.fcc.web.rest.errors;

import java.net.URI;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class PAPIException extends AbstractThrowableProblem {

	private static final long serialVersionUID = 1L;
	
	public static final String PROBLEM_BASE_URL = "http://www.cncsys.co.jp/";
	public static final URI RETURN_ERROR_CODE = URI.create(PROBLEM_BASE_URL);
	
	public PAPIException(int statusCode) {
        super(RETURN_ERROR_CODE, PAPIStatus.getReasonPhrase(statusCode), Status.BAD_REQUEST);
    }
}
